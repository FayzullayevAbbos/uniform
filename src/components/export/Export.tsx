import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import React from "react";
import { baseUrl } from "../../service/URLs.ts";

const Export = ({ url }: { url: string }) => {
  const handleExport = async () => {
    try {
      const fullUrl = baseUrl + url;

      // First try the anchor approach (works if server sends proper headers)
      const link = document.createElement('a');
      link.href = fullUrl;
      link.setAttribute('download', '');
      link.setAttribute('target', '_blank'); // Open in new tab if not downloading
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Fallback: Fetch the file if anchor approach doesn't work
      setTimeout(async () => {
        try {
          const response = await fetch(fullUrl);
          if (response.ok) {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            // @ts-ignore
            link.setAttribute('download');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
          } else {
            console.error('Export failed:', response.statusText);
          }
        } catch (error) {
          console.error('Export error:', error);
        }
      }, 200); // Wait a bit to see if the first approach worked
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  return (
    <Button
      type="default"
      icon={<ExportOutlined />}
      onClick={handleExport}
      className="flex items-center"
    >
      Eksport qilish
    </Button>
  );
};

export default Export;