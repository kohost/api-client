import { describe, expect, it } from "vitest";

import {
  isWellFormedRichText,
  serializeRichTextBody,
  type RichTextBlockNode,
  type RichTextInlineNode,
} from "./ticketRichText.js";

const text = (
  value: string,
  marks?: ("bold" | "italic" | "underline")[],
): RichTextInlineNode => ({
  type: "text",
  text: value,
  ...(marks ? { marks } : {}),
});

const mention = (
  discriminator: "user" | "vendor" | "system",
): RichTextInlineNode => ({
  type: "mention",
  id: `${discriminator}-1`,
  discriminator,
  label: "Jane Doe",
});

const hardBreak: RichTextInlineNode = { type: "hardBreak" };

const ticketRef: RichTextInlineNode = {
  type: "ticket",
  id: "ticket-1",
  number: "110001",
};

const paragraph = (...content: RichTextInlineNode[]): RichTextBlockNode => ({
  type: "paragraph",
  content,
});

const listItem = (...content: RichTextInlineNode[]) => ({
  type: "listItem" as const,
  content,
});

describe("serializeRichTextBody", () => {
  it("joins paragraphs with newlines and drops marks", () => {
    expect(
      serializeRichTextBody([
        paragraph(text("first "), text("loud", ["bold"])),
        paragraph(text("second", ["italic"])),
      ]),
    ).toBe("first loud\nsecond");
  });

  it("renders mentions as @label", () => {
    expect(
      serializeRichTextBody([paragraph(text("hey "), mention("user"))]),
    ).toBe("hey @Jane Doe");
  });

  it("renders ticket references as #number", () => {
    expect(
      serializeRichTextBody([paragraph(text("see "), ticketRef, text(" too"))]),
    ).toBe("see #110001 too");
  });

  it("prefixes bullet items with • and renumbers ordered items", () => {
    expect(
      serializeRichTextBody([
        {
          type: "bulletList",
          content: [listItem(text("a")), listItem(text("b"))],
        },
        {
          type: "orderedList",
          content: [listItem(text("x")), listItem(text("y"))],
        },
      ]),
    ).toBe("• a\n• b\n1. x\n2. y");
  });
});

describe("isWellFormedRichText", () => {
  it("accepts a tree using every node kind and mark", () => {
    const content = [
      paragraph(
        text("plain "),
        text("bold", ["bold"]),
        text("both", ["bold", "italic"]),
        hardBreak,
        text("italic", ["italic"]),
        text("underline", ["underline"]),
        text("all three", ["bold", "italic", "underline"]),
        mention("user"),
        ticketRef,
      ),
      {
        type: "bulletList",
        content: [listItem(text("first"))],
      },
      {
        type: "orderedList",
        content: [listItem(text("second"))],
      },
    ];
    expect(isWellFormedRichText(content)).toBe(true);
  });

  it("rejects an unknown block type", () => {
    expect(isWellFormedRichText([{ type: "codeBlock", content: [text("x")] }])).toBe(
      false,
    );
  });

  it("rejects an unknown inline type", () => {
    expect(
      isWellFormedRichText([paragraph({ type: "emoji", name: "wave" } as never)]),
    ).toBe(false);
  });

  it("rejects a mention with an unknown discriminator", () => {
    expect(
      isWellFormedRichText([
        paragraph({
          type: "mention",
          id: "x-1",
          discriminator: "group",
          label: "Ops",
        } as never),
      ]),
    ).toBe(false);
  });

  it("rejects a ticket reference missing its id or number", () => {
    expect(
      isWellFormedRichText([paragraph({ type: "ticket", id: "t-1" } as never)]),
    ).toBe(false);
    expect(
      isWellFormedRichText([
        paragraph({ type: "ticket", number: "110001" } as never),
      ]),
    ).toBe(false);
  });

  it("rejects nodes with missing fields", () => {
    expect(isWellFormedRichText([{ type: "paragraph" }])).toBe(false);
    expect(isWellFormedRichText([paragraph({ type: "text" } as never)])).toBe(
      false,
    );
    expect(
      isWellFormedRichText([
        paragraph({ type: "mention", id: "user-1" } as never),
      ]),
    ).toBe(false);
    expect(isWellFormedRichText([paragraph({ text: "no type" } as never)])).toBe(
      false,
    );
  });

  it("rejects non-array content", () => {
    expect(isWellFormedRichText(undefined)).toBe(false);
    expect(isWellFormedRichText(null)).toBe(false);
    expect(isWellFormedRichText("paragraph")).toBe(false);
    expect(isWellFormedRichText({ type: "paragraph" })).toBe(false);
  });

  it("rejects a list whose items are not listItems", () => {
    expect(
      isWellFormedRichText([{ type: "orderedList", content: [text("loose")] }]),
    ).toBe(false);
  });

  it("rejects malformed nodes nested anywhere in the tree", () => {
    const content = [
      paragraph(text("fine")),
      {
        type: "bulletList",
        content: [
          listItem(text("fine")),
          { type: "listItem", content: [{ type: "text", text: 42 }] },
        ],
      },
    ];
    expect(isWellFormedRichText(content)).toBe(false);
  });
});
