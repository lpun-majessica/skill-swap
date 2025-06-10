"use client";

import { useState, useEffect } from "react";

import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from "@/utils/config";
import userService from "@/services/user";
import { useAuthContext } from "@/contexts/auth-context";

const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUDINARY_CONFIG.cloudName,
  },
});

const uploadWidgetConfig = {
  cloudName: CLOUDINARY_CONFIG.cloudName,
  clientAllowedFormats: "image",
  uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
  sources: ["local", "url", "camera", "google_drive", "dropbox"],
  showAdvancedOptions: false,
  cropping: true,
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
  const [uploadWidget, setUploadWidget] = useState(null);
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (typeof window !== "undefined" && window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        uploadWidgetConfig,
        async (error, result) => {
          if (error) {
            console.error("Upload error:", error);
            toast.error(
              `Upload failed: ${error.statusText || "Unknown error"}`,
            );
            return;
          }

          if (result && result.event === "success") {
            console.log(result);

            const promise = () =>
              new Promise((resolve) => setTimeout(() => resolve(), 3000));

            toast.promise(promise, {
              loading: "Loading...",
              success: () => {
                return "Upload image successfully!";
              },
              error: "Error",
            });
            console.log(currentUser);

            await userService.updateUser(currentUser.id, {
              pfp: result.info.secure_url,
            });
          } else if (result && result.event === "close") {
            if (!result.info) {
              toast.error("Upload cancelled or failed. Please try again.");
            }
          }
        },
      );
      setUploadWidget(widget);
    }

    return () => {
      if (uploadWidget) {
        uploadWidget.destroy();
      }
    };
  }, []);

  const openUploadWidget = (e) => {
    e.preventDefault();

    if (uploadWidget) {
      uploadWidget.open();
    }
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className={className}
      onClick={openUploadWidget}
      title="Edit profile picture"
    >
      <Pencil className="size-3 md:size-4 lg:size-5" />
    </Button>
  );
};

export default ImageUpload;
