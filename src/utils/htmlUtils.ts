import pathUtils from "@/utils/pathUtils.ts";

export function replaceUrl(html: string, baseDir: string) {
  if (!html) return '';
  const isPackaged = window.api.appInfo.versions.isPackaged
  // const regex = /src="[^"]*\/([^"\/?]+)"/g;
  const regex = /src="[^"]*\/([^"?]+)[^"]*"/g;
  if (isPackaged) {
    return html.replaceAll(regex, `src="${baseDir}/$1"`)
  } else {
    return html.replaceAll(regex, (match, p1) => {
      // const encodedPath = encodeURIComponent(`${baseDir}/${p1}`);
      // return `src="http://localhost:5173/http_get?path=${encodedPath}"`
      const filePath = `${baseDir}/${p1}`
      return `src="local-resource://${filePath}"`
    })
    // return html.replaceAll(regex, `src="http://localhost:5173/http_get?path=${baseDir}/$1"`)
  }
}