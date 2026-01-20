export function replaceUrl(html: string, baseDir: string) {
  if (!html) return '';
  const isPackaged = window.api.appInfo.versions.isPackaged
  const regex = /src="[^"]*\/([^"\/?]+)"/g;
  if (isPackaged) {
    return html.replaceAll(regex, `src="${baseDir}/$1"`)
  } else {
    return html.replaceAll(regex, `src="http://localhost:5173/http_get?path=${baseDir}/$1"`)
  }
}