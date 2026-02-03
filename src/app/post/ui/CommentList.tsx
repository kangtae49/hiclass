import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import PostAttachList from "@/app/post/ui/PostAttachList.tsx";
import {format} from "date-fns";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";
import CommentReplyList from "@/app/post/ui/CommentReplyList.tsx";
import pathUtils from "@/utils/pathUtils.ts";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import {faMessage} from "@fortawesome/free-solid-svg-icons";
import {JsonComment} from "@/app/post/post.types.ts";

interface Props {
  boardId: string
  postId: string
  commentKey: string
  // comments: any []
}

const CommentList = observer(({boardId, postId, commentKey}: Props) => {
  const jsonDataStore = useJsonDataStore(JSON_DATA_ID)
  // const commentKey = pathUtils.getScriptSubPath(`data\\${boardId}_comment\\${postId}.json`)
  const data = jsonDataStore.jsonDataMap[commentKey]?.data
  const comments: JsonComment [] = data?._embedded?.postComments
  // console.log(comments)
  useEffect(() => {
    if (commentKey) {
      window.api.addWatchPath([commentKey])
    }
  }, [commentKey])

  return (
    <div className="comment-list">
      <div>
        <Icon icon={faMessage} />
        댓글 {comments?.length || 0}
      </div>
      {comments?.map((comment: any, index: number) => (
        <div key={index} className="comment">
          <div className="comment-title">
            {comment.writeUser.userName}
            {comment.writeUser.userType === 'PARENTS' ? `(${comment.writeUser.memberChildName} 학부모)` : ''}
            {format(new Date(comment.updatedTimestamp), "yyyy-MM-dd HH:mm:ss")}
          </div>
          <div className="comment-content">
            {comment.comment}
          </div>
          <PostAttachList boardId={boardId} postId={postId} files={comment.files} />
          {comment.reactions && (
            <CommentReplyList boardId={boardId} commentId={comment.currentId} replyKey={pathUtils.getScriptSubPath(`data\\${boardId}_comment\\${comment.currentId}.json`)} />
          )}
        </div>
      ))}
    </div>
  )
})

export default CommentList;