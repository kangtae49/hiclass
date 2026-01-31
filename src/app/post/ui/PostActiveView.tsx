import "./PostActiveView.css"
import {observer} from "mobx-react-lite";
import usePostStore from "@/app/post/usePostStore.ts";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";
import pathUtils from "@/utils/pathUtils.ts";
import React, {useEffect} from "react";
import {replaceUrl} from "@/utils/htmlUtils.ts";
import CommentList from "@/app/post/ui/CommentList.tsx";
import PostAttachList from "@/app/post/ui/PostAttachList.tsx";
import {format} from "date-fns";
import classNames from "classnames";
import {CONTENTS_VIEW} from "@/app/layout/layout.tsx";
import {JustId, useJustLayoutStore} from "@kangtae49/just-layout";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import {faFile, faImage, faMessage} from "@fortawesome/free-solid-svg-icons";
import {POST_ACTIVE_ID} from "@/app/post/post.constants.ts";

interface Props {
  justId: JustId
  layoutId: string
}

const PostActiveView = observer(({layoutId}: Props) => {
  const postStore = usePostStore(POST_ACTIVE_ID)
  const justLayoutStore = useJustLayoutStore(layoutId)
  const jsonDataStore = useJsonDataStore(JSON_DATA_ID)
  const postId = postStore.post?.postId
  const boardId = postStore.post?.boardId

  const boardListKey = pathUtils.getScriptSubPath(`data\\${boardId}.json`)
  const commentKey = pathUtils.getScriptSubPath(`data\\${boardId}_comment\\${postId}.json`)

  const boardListData = jsonDataStore.jsonDataMap[boardListKey]?.data

  const posts = boardListData?._embedded.posts
  const post = posts?.find((post: any) => post.postId === postId)

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

  const toggleShowContent = () => {
    postStore.setShowContent(!postStore.showContent)
  }
  const toggleShowComment = () => {
    postStore.setShowComment(!postStore.showComment)
  }

  const toggleShowAttach = () => {
    postStore.setShowAttach(!postStore.showAttach)
  }

  const openBoard = () => {
    if (!boardId) return;
    const boardJustId: JustId = {viewId: "board-list-view", title: boardNm, params: {boardId: boardId, boardNm: boardNm}}
    justLayoutStore.openWinByNodeName({justId: boardJustId, nodeName: CONTENTS_VIEW})
  }

  const openPost = () => {
    if (!postId || !boardId) return;
    openBoard()
    const postJustId: JustId = { viewId: "post-active-view", title: '내용' }
    postStore.setPost({boardId, postId})
    setTimeout(() => {
      justLayoutStore.openWinByNodeName({justId: postJustId, nodeName: CONTENTS_VIEW})
    }, 0)
  }

  // const onKeyDown = (event: any) => {
  //   console.log('onKeyDown')
  //   if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
  //     console.log('Ctrl + F')
  //     postStore.setShowFindBar(true)
  //   }
  // }

  return (
    postStore.post &&
    <div className="post-active-view" tabIndex={0}>
      {/*{postStore.showFindBar && <FindBar  />}*/}
      <div className="breadcrumbs">
        <div className="board" onClick={openBoard}> {boardNm} </div>
        <div>{posted}</div>
        <div>{userName}</div>
      </div>
      <div className="post-title">
          <Icon icon={faFile} className={classNames({"inactive": !postStore.showContent})} onClick={() => toggleShowContent()} />
          <Icon icon={faMessage} className={classNames({"inactive": !postStore.showComment})} onClick={() => toggleShowComment()} />
          <Icon icon={faImage} className={classNames({"inactive": !postStore.showAttach})} onClick={() => toggleShowAttach()} />
          <div className="label" onClick={openPost}>{title}</div>
      </div>
      <div className="post-content">
        {postStore.showContent &&
          <div className="post-html" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        }
        {postStore.showComment &&
          <CommentList
            boardId={postStore.post.boardId}
            postId={postStore.post.postId}
            commentKey={commentKey}
          />
        }
        {postStore.showAttach &&
          <PostAttachList
              boardId={postStore.post.boardId}
              postId={postStore.post.postId}
              files={post?.files}
          />
        }
      </div>
    </div>
  )
})

export default PostActiveView
