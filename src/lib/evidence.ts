import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
  "text/plain",
  "text/markdown",
]);

const MAX_BYTES = 25 * 1024 * 1024;

export function assertEvidenceFileMeta(input: {
  contentType: string;
  byteSize: number;
  fileName: string;
}) {
  if (!ALLOWED_TYPES.has(input.contentType)) {
    throw new Error("Unsupported file type");
  }
  if (input.byteSize <= 0 || input.byteSize > MAX_BYTES) {
    throw new Error("File exceeds size limit");
  }
  if (!input.fileName || input.fileName.length > 255) {
    throw new Error("Invalid file name");
  }
}

/** Creates evidence row + file metadata. Upload bytes separately to Storage `evidence` bucket. */
export async function createEvidenceRecord(input: {
  userId: string;
  checkpointId: string;
  attemptId?: string | null;
  notes?: string | null;
  enrollmentId?: string | null;
  file: {
    storagePath: string;
    fileName: string;
    contentType: string;
    byteSize: number;
  };
}) {
  assertEvidenceFileMeta(input.file);
  const admin = createAdminClient();

  const { data: evidence, error: evidenceError } = await admin
    .from("practical_evidence")
    .insert({
      user_id: input.userId,
      checkpoint_id: input.checkpointId,
      attempt_id: input.attemptId ?? null,
      notes: input.notes ?? null,
      enrollment_id: input.enrollmentId ?? null,
    })
    .select("id")
    .single();
  if (evidenceError) throw evidenceError;

  const { data: file, error: fileError } = await admin
    .from("evidence_files")
    .insert({
      evidence_id: evidence.id,
      storage_path: input.file.storagePath,
      file_name: input.file.fileName,
      content_type: input.file.contentType,
      byte_size: input.file.byteSize,
    })
    .select("id")
    .single();
  if (fileError) throw fileError;

  return { evidenceId: evidence.id as string, fileId: file.id as string };
}

export async function createEvidenceSignedUrl(
  storagePath: string,
  expiresInSec = 60,
) {
  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from("evidence")
    .createSignedUrl(storagePath, expiresInSec);
  if (error) throw error;
  return data.signedUrl;
}
