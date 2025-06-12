import { NextResponse } from "next/server";

const moderationResults = new Map();

export async function POST(request) {
  const data = await request.json();

  if (data.notification_type) {
    return processWebhookRequests(data);
  } else {
    return processFrontend(data);
  }
}

function processWebhookRequests(data) {
  const { moderation_status, moderation_kind, asset_id } = data;

  let status = "pending";
  let message = "";

  if (moderation_status === "rejected") {
    status = "rejected";

    if (moderation_kind === " aws_rek") {
      message = "Your image was rejected due to unsuitable content";
    } else if (moderation_kind === "perception_point") {
      message = "Your image was rejected due to potential malware";
    }
  } else {
    status = "approved";
    message = "Update image successfully!";
  }

  moderationResults.set(asset_id, { status, message });

  return NextResponse.json({ success: true });
}

function processFrontend(data) {
  const { public_id, asset_id, secure_url } = data;

  const moderationResult = moderationResults.get(asset_id);

  if (!moderationResult) {
    return NextResponse.json({
      status: "pending",
      message: "Uploading in progress",
    });
  }

  moderationResults.delete(asset_id);

  if (moderationResult.status === "approved") {
    return NextResponse.json({
      status: "approved",
      publicId: public_id,
      url: secure_url,
    });
  } else {
    return NextResponse.json({
      status: "rejected",
      message: moderationResult.message,
    });
  }
}
