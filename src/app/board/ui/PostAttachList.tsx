import {observer} from "mobx-react-lite";
import pathUtils from "@/utils/pathUtils.ts";
import {useState} from "react";
import classNames from "classnames";
import PreviewMedia from "@/app/board/ui/PreviewMedia.tsx";

interface Props {
  boardId: string
  postId: string
  files: any[]
  isShowAttach?: boolean
}

const PostAttachList = observer(({boardId, postId, files, isShowAttach}: Props) => {
  console.log('files.length:', files?.length)


  const [showAttach, setShowAttach] = useState(isShowAttach ?? false)

  const toggleAttach = () => setShowAttach(!showAttach)

  const clickFile = (boardId: string, postId: string, filePath: string) => () => {
    const fileName = filePath.split('/').pop()
    const localPath = pathUtils.getScriptSubPath(`data\\${boardId}_attach\\${fileName}`)
    window.api.startFile(localPath)
  }
  return (files?.length > 0 &&
    <div>
      <div onClick={toggleAttach}>첨부파일({files?.length || 0})</div>
      <div className={classNames("attach-list", {"hide": !showAttach})}>
        {files?.map((file) => (
          <PreviewMedia key={file.seq} boardId={boardId} postId={postId} file={file} />
        // <div key={file.seq}>
        // {file.fileContentType.startsWith("image/") ? (
        //   <div>
        //     <span onClick={clickFile(boardId, postId, file.fileOriginalPath)}>
        //       <PreviewMedia boardId={boardId} postId={postId} file={file} />
        //     </span>
        //   </div>
        // ) : (
        //   <div>
        //     <span onClick={clickFile(boardId, postId, file.fileTranscodePath)}>{file.fileName}</span>
        //   </div>
        // )}
        // </div>
      ))}
      </div>
    </div>
  )
})

export default PostAttachList