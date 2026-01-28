import {observer} from "mobx-react-lite";
import pathUtils from "@/utils/pathUtils.ts";
import React from "react";
import classNames from "classnames";

interface Props extends React.Attributes{
  boardId: string
  postId: string
  file: any
}

const PreviewMedia = observer(({boardId, file}: Props) => {
  const isVideo = file.fileContentType.startsWith("video/")
  const filePath = !isVideo ? file.fileOriginalPath : file.fileTranscodePath
  const fileName = filePath?.split('/')?.pop() ?? null
  const localPath = pathUtils.getScriptSubPath(`data\\${boardId}_attach\\${fileName}`)
  const srcUrl = pathUtils.getLocalSrc(localPath)

  const clickFile = (boardId: string, file: any) => () => {
    const isVideo = file.fileContentType.startsWith("video/")
    const filePath = !isVideo ? file.fileOriginalPath : file.fileTranscodePath
    const fileName = filePath.split('/').pop()
    const localPath = pathUtils.getScriptSubPath(`data\\${boardId}_attach\\${fileName}`)
    window.api.startFile(localPath)
  }

  return (
    <div className={classNames("preview-media", {"video": file.fileContentType.startsWith("video/")}, {"audio": file.fileContentType.startsWith("audio/")})} onClick={clickFile(boardId, file)}>
      {file.fileContentType.startsWith("image/") &&
        <img
          src={srcUrl}
          alt={fileName}
          loading="lazy"
        />
      }
      {file.fileContentType.startsWith("video/") &&
        <video>
          <source src={srcUrl} type="video/mp4" />
        </video>
      }
      {file.fileContentType.startsWith("audio/") &&
        <audio controls>
          <source src={srcUrl} type="audio/mp3" />
        </audio>
      }
    </div>
  )
})

export default PreviewMedia