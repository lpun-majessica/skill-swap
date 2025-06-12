"use client";

import { useCallback } from "react";
import { useAuthContext } from "@/contexts/auth-context";
import { useCurrentUserContext } from "@/contexts/current-user-context";

import { CldUploadWidget } from "next-cloudinary";

import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { CLOUDINARY_CONFIG } from "@/utils/config";

import userService from "@/services/user";

const uploadWidgetOptions = {
  clientAllowedFormats: "image",
  sources: ["local", "url", "camera", "google_drive", "dropbox"],
  showAdvancedOptions: false,
  cropping: false,
  multiple: false,
  maxFiles: 1,
  defaultSource: "local",
  styles: {
    palette: {
      window: "#211D1D",
      sourceBg: "#484848",
      windowBorder: "#B5ACAA",
      tabIcon: "#EAE7E7",
      inactiveTabIcon: "#807F7F",
      menuIcons: "#EA1611",
      link: "#EA1307",
      action: "#F77561",
      inProgress: "#F59C9C",
      complete: "#EF2D23",
      error: "#EA2727",
      textDark: "#444343",
      textLight: "#E4E2E2",
    },
    fonts: {
      default: null,
      "'Poppins', sans-serif": {
        url: "https://fonts.googleapis.com/css?family=Poppins",
        active: true,
      },
    },
  },
};

const ImageUpload = ({ className }) => {
  const { currentUser } = useAuthContext();
  const { updateProfilePicture } = useCurrentUserContext();

  const checkModeration = useCallback(
    async (info, startTime, loadingToastId) => {
      if (Date.now() - startTime > 60000) {
        toast.dismiss(loadingToastId);
        toast.error("Moderation check timed out. Please try again.");
        return;
      }

      try {
        const data = await userService.checkImageModerationResult(info);

        if (currentUser && data.status === "approved") {
          updateProfilePicture(data.publicId, data.url);
          toast.dismiss(loadingToastId);
          toast.success("Upload image successfully!");
        } else if (data.status === "rejected") {
          toast.error(data.message);
        } else {
          setTimeout(() => checkModeration(info, startTime), 1000);
        }
      } catch (error) {
        console.error("Error checking moderation status:", error);
        toast.error("An error occurred while processing your image.");
      }
    },
    [],
  );

  const handleUploadSuccess = (result) => {
    const loadingToastId = toast.loading("Uploading image...");
    const startTime = Date.now();
    checkModeration(result.info, startTime, loadingToastId);
  };

  const handleUploadError = (error) => {
    console.error("Upload error:", error);
    toast.error(`Upload failed: ${error.statusText || "Unknown error"}`);
  };

  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      options={uploadWidgetOptions}
      config={{
        cloud: {
          cloudName: CLOUDINARY_CONFIG.cloudName,
          apiKey: CLOUDINARY_CONFIG.apiKey,
        },
      }}
      onSuccess={handleUploadSuccess}
      onError={handleUploadError}
    >
      {({ open }) => {
        return (
          <Button
            variant="secondary"
            size="icon"
            className={className}
            onClick={() => open()}
            title="Edit profile picture"
          >
            <Pencil className="size-3 md:size-4 lg:size-5" />
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
