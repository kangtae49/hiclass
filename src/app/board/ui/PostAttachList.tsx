import {observer} from "mobx-react-lite";
import pathUtils from "@/utils/pathUtils.ts";

interface Props {
  boardId: string
  postId: string
  files: any[]
}

const PostAttachList = observer(({boardId, postId, files}: Props) => {
  console.log('files.length:', files?.length)

  const clickFile = (boardId: string, postId: string, filePath: string) => () => {
    const fileName = filePath.split('/').pop()
    const localPath = pathUtils.getScriptSubPath(`data\\${boardId}_attach\\${fileName}`)
    window.api.startFile(localPath)
  }
  return (files?.length > 0 &&
    <div>
      <div>첨부파일({files?.length || 0})</div>
      {files?.map((file, index) => (
        <div key={file.seq}>
        {file.fileContentType.startsWith("image/") ? (
          <div>
            <span onClick={clickFile(boardId, postId, file.fileOriginalPath)}>{file.fileName}</span>
          </div>
        ) : (
          <div>
            <span onClick={clickFile(boardId, postId, file.fileTranscodePath)}>{file.fileName}</span>
          </div>
        )}
        </div>
      ))}
    </div>
  )
})

export default PostAttachList