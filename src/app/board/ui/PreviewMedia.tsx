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
  const isImage = file.fileContentType.startsWith("image/")
  const filePath = isImage ? file.fileOriginalPath : file.fileTranscodePath
  const fileName = filePath.split('/').pop()
  const localPath = pathUtils.getScriptSubPath(`data\\${boardId}_attach\\${fileName}`)
  const srcUrl = pathUtils.getLocalSrc(localPath)

  const clickFile = (boardId: string, file: any) => () => {
    const filePath = file.fileContentType.startsWith("image/") ? file.fileOriginalPath : file.fileTranscodePath
    const fileName = filePath.split('/').pop()
    const localPath = pathUtils.getScriptSubPath(`data\\${boardId}_attach\\${fileName}`)
    window.api.startFile(localPath)
  }

  return (
    <div className={classNames("preview-media", {"video": !isImage})} onClick={clickFile(boardId, file)}>
      {isImage ?
        <img
          src={srcUrl}
          alt={fileName}
          loading="lazy"
        />:
        <video>
          <source src={srcUrl} type="video/mp4" />
        </video>
      }
    </div>
  )
})

export default PreviewMedia