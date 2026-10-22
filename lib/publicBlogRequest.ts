// Only idempotent public reads use this retry policy.
const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);
const MAX_ATTEMPTS = 3;
const ATTEMPT_TIMEOUT_MS = 20000;

export class PublicBlogRequestError extends Error {
  constructor(readonly status?: number, options?: ErrorOptions) {
    super('Unable to load blogs. Please try again.', options);
    this.name = 'PublicBlogRequestError';
  }
}

export async function requestPublicBlogData<T>(
  url: string,
  parse: (payload: unknown) => T,
): Promise<T> {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url, {
        cache: 'no-store',
        // Each attempt needs a new signal; a timed-out signal cannot be reused.
        signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
      });
      if (!response.ok) {
        await response.body?.cancel().catch(() => undefined);
        throw new PublicBlogRequestError(response.status);
      }
      try {
        return parse(await response.json());
      } catch (cause) {
        // A hosting startup page can be HTML with HTTP 200. Never cache that as blog data.
        throw new PublicBlogRequestError(502, { cause });
      }
    } catch (error) {
      const retryable = !(error instanceof PublicBlogRequestError) ||
        (error.status !== undefined && RETRYABLE_STATUS.has(error.status));
      if (!retryable || attempt === MAX_ATTEMPTS - 1) throw error;
      await new Promise<void>((resolve) => setTimeout(resolve, 750 * (attempt + 1)));
    }
  }
  throw new PublicBlogRequestError();
}
