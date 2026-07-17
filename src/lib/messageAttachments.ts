// Shared across the API and app: the API enforces this as a write-time guard
// (see @kohost/api-client consumers in apps/api/src/lib/domain/tickets.ts) and
// the app enforces it client-side before upload (apps/app/src/lib/data/files.ts).
// Not encoded in the ticket schema itself — policy lives in code, not the contract.
export const MAX_MESSAGE_ATTACHMENTS = 15;
