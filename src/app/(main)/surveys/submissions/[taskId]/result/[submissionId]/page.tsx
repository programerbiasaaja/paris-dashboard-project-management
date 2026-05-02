import SubmissionResultClient from "./client";

export default async function Page({ params }: { params: Promise<{ taskId: string; submissionId: string }> }) {
    const { taskId, submissionId } = await params;
    return <SubmissionResultClient taskId={taskId} submissionId={submissionId} />;
}
