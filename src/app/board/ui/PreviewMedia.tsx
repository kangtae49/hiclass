import {observer} from "mobx-react-lite";
import pathUtils from "@/utils/pathUtils.ts";
import React from "react";

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
  console.log('srcUrl', srcUrl)
  return (
    <div className="preview-media">
      {isImage ?
        <img
          src={srcUrl}
          alt={fileName}
          loading="lazy"
        />:
        <video controls>
          <source src={srcUrl} type="video/mp4" />
        </video>
      }
    </div>
  )
})

export default PreviewMedia