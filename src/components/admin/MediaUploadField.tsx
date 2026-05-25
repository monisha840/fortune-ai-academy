import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2 } from "lucide-react";

const BUCKET = "gallery-images";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;   // 5 MB
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;  // 50 MB

export type MediaType = "image" | "video";

interface MediaUploadFieldProps {
    value: string;
    mediaType: MediaType;
    onChange: (url: string, mediaType: MediaType) => void;
    folder?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    hint?: string;
    previewHeight?: string;
}

const inferMediaTypeFromUrl = (url: string): MediaType =>
    /\.(mp4|mov|webm|m4v|ogv|ogg)(\?.*)?$/i.test(url) ? "video" : "image";

const MediaUploadField = ({
    value,
    mediaType,
    onChange,
    folder = "uploads",
    label = "Media",
    placeholder = "Upload from device, or paste https:// URL",
    required = false,
    hint,
    previewHeight = "h-40",
}: MediaUploadFieldProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { toast } = useToast();

    const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;

        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");

        if (!isImage && !isVideo) {
            toast({
                variant: "destructive",
                title: "Unsupported file",
                description: "Please pick an image (PNG, JPG, WebP) or video (MP4, MOV, WebM).",
            });
            return;
        }

        const limit = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
        if (file.size > limit) {
            toast({
                variant: "destructive",
                title: "File too large",
                description: isVideo
                    ? `Videos must be under ${MAX_VIDEO_BYTES / 1024 / 1024} MB.`
                    : `Images must be under ${MAX_IMAGE_BYTES / 1024 / 1024} MB.`,
            });
            return;
        }

        setIsUploading(true);
        try {
            const ext = file.name.split(".").pop()?.toLowerCase() || (isVideo ? "mp4" : "png");
            const safeBase = file.name
                .replace(/\.[^.]+$/, "")
                .replace(/[^a-zA-Z0-9-_]+/g, "-")
                .slice(0, 40)
                .replace(/^-+|-+$/g, "");
            const path = `${folder}/${Date.now()}-${safeBase || (isVideo ? "video" : "image")}.${ext}`;

            const { error: uploadError } = await supabase.storage
                .from(BUCKET)
                .upload(path, file, {
                    cacheControl: "3600",
                    upsert: false,
                    contentType: file.type,
                });

            if (uploadError) {
                const isMissing = /bucket|not found/i.test(uploadError.message);
                toast({
                    variant: "destructive",
                    title: "Upload failed",
                    description: isMissing
                        ? `Bucket "${BUCKET}" doesn't exist yet. Create a public bucket named "${BUCKET}" in Supabase → Storage.`
                        : uploadError.message,
                });
                return;
            }

            const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
            if (!data?.publicUrl) {
                toast({
                    variant: "destructive",
                    title: "No public URL returned",
                    description: `Make sure the "${BUCKET}" bucket is set to Public in Supabase → Storage.`,
                });
                return;
            }

            onChange(data.publicUrl, isVideo ? "video" : "image");
            toast({
                title: isVideo ? "Video uploaded" : "Image uploaded",
                description: "URL auto-filled. You can still edit it below.",
            });
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Unexpected upload error",
                description: err instanceof Error ? err.message : String(err),
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleUrlChange = (url: string) => {
        onChange(url, url ? inferMediaTypeFromUrl(url) : "image");
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-white/60">
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="text-accent hover:text-accent hover:bg-accent/10 gap-2 h-8"
                >
                    {isUploading ? (
                        <Loader2 className="animate-spin" size={14} />
                    ) : (
                        <Upload size={14} />
                    )}
                    {isUploading ? "Uploading…" : "Upload from device"}
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileSelected}
                />
            </div>

            <Input
                value={value}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder={placeholder}
                className="bg-white/5 border-white/10 text-white"
                required={required}
            />

            {hint && <p className="text-xs text-white/30">{hint}</p>}

            {value && (
                <div
                    className={`mt-2 w-full rounded-xl overflow-hidden border border-white/10 bg-navy flex items-center justify-center ${previewHeight}`}
                >
                    {mediaType === "video" ? (
                        <video
                            src={value}
                            controls
                            muted
                            playsInline
                            className="h-full w-full object-contain"
                        />
                    ) : (
                        <img
                            src={value}
                            alt="preview"
                            className="h-full w-full object-contain"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default MediaUploadField;
