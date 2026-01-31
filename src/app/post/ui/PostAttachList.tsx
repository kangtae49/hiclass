import {observer} from "mobx-react-lite";
import classNames from "classnames";
import PreviewMedia from "@/app/post/ui/PreviewMedia.tsx";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";

interface Props {
  boardId: string
  postId: string
  files: any[]
}

const PostAttachList = observer(({boardId, postId, files}: Props) => {


  // const [showAttach, setShowAttach] = useState(isShowAttach ?? false)

  // const toggleAttach = () => setShowAttach(!showAttach)


  return (files?.length > 0 &&
    <div>
      <div>
          <span>
              <Icon icon={faImage} />
          첨부파일({files?.length || 0})
          </span>
      </div>
      <div className={classNames("attach-list")}>
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