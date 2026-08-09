import type { TicketSchema } from "../schemas/ticket.js";

type Message = TicketSchema["conversation"][number];
type ParsedBody = NonNullable<Message["parsedBody"]>;

export type RichTextContent = NonNullable<ParsedBody["content"]>;
export type RichTextBlockNode = RichTextContent[number];
export type RichTextInlineNode = Extract<
  RichTextBlockNode,
  { type: "paragraph" }
>["content"][number];
export type RichTextListItemNode = Extract<
  RichTextBlockNode,
  { type: "bulletList" }
>["content"][number];
export type RichTextMentionNode = Extract<
  RichTextInlineNode,
  { type: "mention" }
>;

function serializeInline(nodes: readonly RichTextInlineNode[]): string {
  let text = "";
  for (const node of nodes) {
    if (node.type === "text") text += node.text;
    else if (node.type === "mention") text += `@${node.label}`;
    else text += "\n";
  }
  return text;
}

/**
 * Canonical plain-text projection of a rich-text tree (ADR 0012). The API
 * derives the stored `body` from this; emails, SMS, `$text` search, ticket
 * subjects, and previews all read that `body`, and the app reuses the same
 * projection for client-side UI state (e.g. the submit-disabled check). Marks
 * are dropped, mentions render as `@label`, list items get `• ` / renumbered
 * `1. ` prefixes, and trailing newlines are trimmed.
 */
export function serializeRichTextBody(
  content: readonly RichTextBlockNode[],
): string {
  const lines: string[] = [];
  for (const block of content) {
    if (block.type === "paragraph") {
      lines.push(serializeInline(block.content));
    } else if (block.type === "bulletList") {
      for (const item of block.content) {
        lines.push(`• ${serializeInline(item.content)}`);
      }
    } else {
      block.content.forEach((item, index) => {
        lines.push(`${index + 1}. ${serializeInline(item.content)}`);
      });
    }
  }
  return lines.join("\n").replace(/\n+$/, "");
}

const INLINE_MARKS = new Set(["bold", "italic", "underline"]);
const MENTION_DISCRIMINATORS = new Set(["user", "vendor", "system"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyArray(value: unknown): value is unknown[] {
  return Array.isArray(value) && value.length > 0;
}

function hasValidMarks(marks: unknown): boolean {
  if (marks === undefined) return true;
  return (
    Array.isArray(marks) &&
    marks.every((mark) => typeof mark === "string" && INLINE_MARKS.has(mark))
  );
}

function isInlineNode(node: unknown): boolean {
  if (!isRecord(node)) return false;
  switch (node.type) {
    case "text":
      return typeof node.text === "string" && hasValidMarks(node.marks);
    case "mention":
      return (
        typeof node.id === "string" &&
        typeof node.label === "string" &&
        typeof node.discriminator === "string" &&
        MENTION_DISCRIMINATORS.has(node.discriminator)
      );
    case "hardBreak":
      return true;
    default:
      return false;
  }
}

function isInlineContent(nodes: unknown): boolean {
  return isNonEmptyArray(nodes) && nodes.every(isInlineNode);
}

function isListContent(items: unknown): boolean {
  return (
    isNonEmptyArray(items) &&
    items.every(
      (item) =>
        isRecord(item) &&
        item.type === "listItem" &&
        isInlineContent(item.content),
    )
  );
}

function isBlockNode(node: unknown): boolean {
  if (!isRecord(node)) return false;
  switch (node.type) {
    case "paragraph":
      return isInlineContent(node.content);
    case "bulletList":
    case "orderedList":
      return isListContent(node.content);
    default:
      return false;
  }
}

/**
 * True when the tree fully conforms to the current ADR 0012 vocabulary: the
 * block/inline shapes, the whitelisted marks, and the mention fields. Anything
 * unknown or malformed — an unrecognized block type, an out-of-vocabulary mark,
 * an empty content array (the schema requires `minItems: 1`), a
 * forward-versioned node — fails here. Callers react to a false result
 * differently: the API skips serialization so the schema validator rejects the
 * write, while the app falls back to rendering the server-derived plain-text
 * `body`.
 */
export function isWellFormedRichText(
  content: unknown,
): content is RichTextContent {
  return isNonEmptyArray(content) && content.every(isBlockNode);
}
