import {observer} from "mobx-react-lite";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";
import {useEffect} from "react";
import pathUtils from "@/utils/pathUtils.ts";
import PostAttachList from "@/app/board/ui/PostAttachList.tsx";
import {format} from "date-fns";

interface Props {
  boardId: string
  postId: string
  comments: any []
}

const CommentList = observer(({boardId, postId, comments}) => {
  // const jsonDataStore = useJsonDataStore(JSON_DATA_ID)
  // const commentKey = pathUtils.getScriptSubPath(`data\\${boardId}_comment\\${postId}.json`)
  // const data = jsonDataStore.jsonDataMap[commentKey]?.data
  // const comments = data?._embedded?.postComments
  // console.log(comments)

  useEffect(() => {
    // window.api.addWatchPath([commentKey])
  }, [])

  return (
    <div className="comment-list">
      <div>
        댓글 {comments?.length || 0}
      </div>
      {comments?.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment-title">
            {comment.writeUser.userName} {format(new Date(comment.updatedTimestamp), "yyyy-MM-dd HH:mm:ss")}
          </div>
          <div className="comment-content">
            {comment.comment}
          </div>
          <PostAttachList boardId={boardId} postId={postId} files={comment.files} />
        </div>
      ))}
    </div>
  )
})

export default CommentList;