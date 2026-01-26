const SEP = '\\'
const pathUtils = {
  basename: (path: string) => path.split(/[\\/]/).pop() || "",

  dirname: (path: string) => {
    const parts = path.split(SEP);
    parts.pop();
    return parts.join(SEP) || (path.startsWith(SEP) ? SEP : '.');
  },
  extname: (path: string) => {
    const ext = path.split('.').pop()
    return ext ? `.${ext}` : ''
  },
  join: (...args: string[]) => {
    return args
      .map((part, i) => {
        if (i === 0) return part.trim().replace(/[\\/]+$/, '');
        return part.trim().replace(/^[\\/]+|[\\/]+$/g, '');
      })
      .filter(x => x.length > 0)
      .join(SEP);
  },
  getScriptSubPath(subpath: string): string {
    return this.join(window.api.appInfo.scriptPath, subpath)
  },
  getLockFile(filePath: string): string {
    const fileName = this.basename(filePath)
    const dirName = this.dirname(filePath)
    return this.join(dirName, SEP, `~$${fileName}`)
  },
  getLocalSrc(filePath: string): string {
    const isPackaged = window.api.appInfo.versions.isPackaged
    if (isPackaged) {
      return filePath
    } else {
      const encodedPath = encodeURIComponent(filePath);
      return `http://localhost:5173/http_get?path=${encodedPath}`
    }
  }
};

export default pathUtils;