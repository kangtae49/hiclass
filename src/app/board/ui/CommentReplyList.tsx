import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import PostAttachList from "@/app/board/ui/PostAttachList.tsx";
import {format} from "date-fns";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";

interface Props {
  boardId: string
  commentId: string
  replyKey: string
  // comments: any []
}

const CommentReplyList = observer(({boardId, commentId, replyKey}: Props) => {
  const jsonDataStore = useJsonDataStore(JSON_DATA_ID)
  // const commentKey = pathUtils.getScriptSubPath(`data\\${boardId}_comment\\${postId}.json`)
  const data = jsonDataStore.jsonDataMap[replyKey]?.data
  const comments = data?._embedded?.postComments
  // console.log(comments)
  console.log('CommentList', boardId, commentId, replyKey)
  useEffect(() => {
    if (replyKey) {
      window.api.addWatchPath([replyKey])
    }
  }, [replyKey])

  return (
    <div className="comment-reply-list">
      {comments?.length > 0 &&
        (
          <div>답글 {comments?.length || 0}</div>
        )
      }
      {comments?.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment-title">
            {comment.writeUser.userName}
            {comment.writeUser.userType === 'PARENTS' ? `(${comment.writeUser.memberChildName} 학부모)` : ''}
            {format(new Date(comment.updatedTimestamp), "yyyy-MM-dd HH:mm:ss")}
          </div>
          <div className="comment-content">
            {comment.comment}
          </div>
        </div>
      ))}
    </div>
  )
})

export default CommentReplyList;