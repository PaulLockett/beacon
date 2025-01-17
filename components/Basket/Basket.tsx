"use client";

import { LiveObject } from "@liveblocks/client";
import { useMutation, useSelf, useStorage } from "@liveblocks/react";
import { FileIcon, GlobeIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { startIngestion } from "@/lib/actions/startIngestion";
import { toast } from "@/lib/hooks/use-toast";
import styles from "./Basket.module.css";

export function Basket() {
  const canWrite = useSelf((me) => me.canWrite);
  const [isLoading, setIsLoading] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  // Get files and URLs from Liveblocks storage
  const files = useStorage((root) => root.files);
  const urls = useStorage((root) => root.urls);

  // Add a file to the storage
  const addFile = useMutation(({ storage }, file: File) => {
    if (!storage.get("files")) {
      storage.set("files", new LiveObject({}));
    }
    const files = storage.get("files");
    files.set(file.name, {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
    });
  }, []);

  // Remove a file from storage
  const removeFile = useMutation(({ storage }, fileName: string) => {
    const files = storage.get("files");
    if (files) {
      files.delete(fileName);
    }
  }, []);

  // Add a URL to the storage
  const addUrl = useMutation(({ storage }, url: string) => {
    if (!storage.get("urls")) {
      storage.set("urls", new LiveObject({}));
    }
    const urls = storage.get("urls");
    const urlId = new Date().getTime().toString();
    urls.set(urlId, {
      url,
      addedAt: new Date().toISOString(),
    });
  }, []);

  // Remove a URL from storage
  const removeUrl = useMutation(({ storage }, urlId: string) => {
    const urls = storage.get("urls");
    if (urls) {
      urls.delete(urlId);
    }
  }, []);

  // Handle URL submission
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    try {
      // Basic URL validation
      new URL(urlInput);
      addUrl(urlInput);
      setUrlInput("");
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive",
      });
    }
  };

  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        addFile(file);
      });
    },
    [addFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: !canWrite,
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        urls: urls ? Object.values(urls).map((url) => url.url) : [],
        goal: formData.get("goal") as string,
        outputFormat: formData.get("outputFormat") as "CSV" | "Excel" | "JSON",
      };

      const result = await startIngestion(data);
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start ingestion process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasContent =
    (files && Object.keys(files).length > 0) ||
    (urls && Object.keys(urls).length > 0);

  // Get combined list of files and URLs
  const items = [
    ...(files
      ? Object.entries(files).map(([id, file]) => ({
          id,
          type: "file" as const,
          name: file.name,
          info: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          data: file,
        }))
      : []),
    ...(urls
      ? Object.entries(urls).map(([id, url]) => ({
          id,
          type: "url" as const,
          name: url.url,
          info: `Added ${new Date(url.addedAt).toLocaleString()}`,
          data: url,
        }))
      : []),
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.container}>
      <div className={styles.inputForms}>
        <div className={styles.inputForm}>
          <h2 className={styles.sectionTitle}>Add Files</h2>
          <div
            {...getRootProps()}
            className={`${styles.dropzone} ${
              isDragActive ? styles.active : ""
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag and drop files here, or click to select files</p>
            )}
          </div>
        </div>

        <div className={styles.inputForm}>
          <h2 className={styles.sectionTitle}>Add URLs</h2>
          <form onSubmit={handleUrlSubmit} className={styles.urlForm}>
            <Input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com"
              required
            />
            <Button type="submit" disabled={!canWrite}>
              Add URL
            </Button>
          </form>
        </div>
      </div>

      {items.length > 0 && (
        <div className={styles.itemsList}>
          <h2 className={styles.sectionTitle}>Added Items</h2>
          <div className={styles.items}>
            {items.map((item) => (
              <Card key={item.id} className={styles.itemCard}>
                <div className={styles.itemIcon}>
                  {item.type === "file" ? (
                    <FileIcon className={styles.icon} />
                  ) : (
                    <GlobeIcon className={styles.icon} />
                  )}
                </div>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemMeta}>{item.info}</span>
                </div>
                {canWrite && (
                  <Button
                    variant="destructive"
                    onClick={() =>
                      item.type === "file"
                        ? removeFile(item.id)
                        : removeUrl(item.id)
                    }
                  >
                    Remove
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <Label htmlFor="goal">Output Goal (Optional)</Label>
          <Textarea
            id="goal"
            name="goal"
            placeholder="Describe the goal of this basket..."
            className={styles.goalInput}
          />
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="outputFormat">Output Format</Label>
          <Select name="outputFormat" defaultValue="CSV">
            <SelectTrigger>
              <SelectValue placeholder="Select output format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CSV">CSV</SelectItem>
              <SelectItem value="Excel">Excel</SelectItem>
              <SelectItem value="JSON">JSON</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={isLoading || !canWrite || !hasContent}>
          {isLoading ? "Starting Ingestion..." : "Start Ingestion"}
        </Button>
      </form>
    </div>
  );
}