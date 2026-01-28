import "./PostActiveView.css"
import {observer} from "mobx-react-lite";
import useBoardStore from "@/app/board/useBoardStore.ts";
import {BOARD_ID} from "@/app/board/board.constants.ts";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";
import pathUtils from "@/utils/pathUtils.ts";
import {useEffect} from "react";
import {replaceUrl} from "@/utils/htmlUtils.ts";
import CommentList from "@/app/board/ui/CommentList.tsx";
import PostAttachList from "@/app/board/ui/PostAttachList.tsx";
import {format} from "date-fns";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import {faClone, faFile, faImage, faMessage} from "@fortawesome/free-solid-svg-icons";
import {CONTENTS_VIEW} from "@/app/layout/layout.tsx";
import {JustId, useJustLayoutStore} from "@kangtae49/just-layout";
import classNames from "classnames";

interface Props {
  justId: JustId
  layoutId: string
}

const PostActiveView = observer(({justId, layoutId}: Props) => {
  const justLayoutStore = useJustLayoutStore(layoutId)
  const boardStore = useBoardStore(BOARD_ID)
  const jsonDataStore = useJsonDataStore(JSON_DATA_ID)
  const postId = boardStore.post?.postId
  const boardId = boardStore.post?.boardId

  const boardListKey = pathUtils.getScriptSubPath(`data\\${boardId}.json`)
  const commentKey = pathUtils.getScriptSubPath(`data\\${boardId}_comment\\${postId}.json`)

  const boardListData = jsonDataStore.jsonDataMap[boardListKey]?.data
  const posts = boardListData?._embedded.posts
  const post = posts?.find(post => post.postId === postId)

  const title = post?.postTitle
  const posted = post?.posted ? format(new Date(post.posted), "yyyy-MM-dd HH:mm:ss") : ''
  const boardNm = post?.board.boardName
  const htmlContent = replaceUrl(post?.postContent, pathUtils.getScriptSubPath(`data\\${boardId}_attach`))
  const userName = post?.writeUser.userName

  useEffect(() => {
    if (commentKey) {
      window.api.addWatchPath([commentKey])
    }
    if (boardListKey) {
      window.api.addWatchPath([boardListKey])
    }
  }, [boardListKey, commentKey])

  // const openBoard = () => {
  //   const postId = boardStore.post?.postId
  //   const boardId = boardStore.post?.boardId
  //   if (!boardId || !postId) return
  //   console.log("openBoard", boardId, postId)
  //   const boardJustId = {
  //     ...justId,
  //     title: post?.postTitle,
  //     viewId: "post-view",
  //     params: {boardId, postId}
  //   }
  //   justLayoutStore.openWinByNodeName({justId: boardJustId, nodeName: CONTENTS_VIEW})
  // }

  const toggleShowContent = () => {
    boardStore.setShowContent(!boardStore.showContent)
  }
  const toggleShowComment = () => {
    boardStore.setShowComment(!boardStore.showComment)
  }

  const toggleShowAttach = () => {
    boardStore.setShowAttach(!boardStore.showAttach)
  }

  return (
    boardStore.post &&
    <div className="post-active-view">
        <div className="tm">{boardNm} {posted} {userName}</div>
        <div className="post-title">
            {/*<Icon icon={faClone} onClick={() => openBoard()}/>*/}
            <Icon icon={faFile} className={classNames({"inactive": !boardStore.showContent})} onClick={() => toggleShowContent()} />
            <Icon icon={faMessage} className={classNames({"inactive": !boardStore.showComment})} onClick={() => toggleShowComment()} />
            <Icon icon={faImage} className={classNames({"inactive": !boardStore.showAttach})} onClick={() => toggleShowAttach()} />
            <strong>{title}</strong></div>
        <div className="post-content">
          {boardStore.showContent &&
            <div className="post-html" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
          }
          {boardStore.showComment &&
            <CommentList
              boardId={boardStore.post.boardId}
              postId={boardStore.post.postId}
              commentKey={commentKey}
              // comments={jsonDataStore.jsonDataMap[commentKey]?.data._embedded.postComments}
            />
          }
          {boardStore.showAttach &&
            <PostAttachList
                boardId={boardStore.post.boardId}
                postId={boardStore.post.postId} files={post?.files}
            />
          }
        </div>
    </div>
  )
})

export default PostActiveView