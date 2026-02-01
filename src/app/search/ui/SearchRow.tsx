import {RowComponentProps} from "react-window";
import {observer, Observer} from "mobx-react-lite";
import {CONTENTS_VIEW} from "@/app/layout/layout.tsx";
import usePostStore from "@/app/post/usePostStore.ts";
import {POST_ACTIVE_ID} from "@/app/post/post.constants.ts";
import classNames from "classnames";
import {JustId, useJustLayoutStore} from "@kangtae49/just-layout";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import {faMessage, faImage, faFilm, faMusic} from "@fortawesome/free-solid-svg-icons";
import {Attributes} from "react";

interface Props extends Attributes{
  count: number
  layoutId: string
  postList: any[]
}

const SearchRow = observer(({
  index,
  style,
  count,
  layoutId,
  postList
}: RowComponentProps<Props>) => {
  const justLayoutStore = useJustLayoutStore(layoutId)
  const postStore = usePostStore(POST_ACTIVE_ID)

  const row = postList[index]
  const boardId = row.board.boardId
  const boardName = row.board.boardName
  const no = count - index
  const title = row?.postTitle
  const commentCount = row?.commentCount || 0
  const attachCount = row?.files?.length || 0
  const imageCount = row?.files.filter((file: any)=>file.fileContentType.startsWith('image')).length || 0
  const videoCount = row?.files.filter((file: any)=>file.fileContentType.startsWith('video')).length || 0
  const audioCount = row?.files.filter((file: any)=>file.fileContentType.startsWith('audio')).length || 0


  const clickPost = () => {
    const justId: JustId = { viewId: "post-active-view", title: '내용' }
    postStore.setPost({postId: row?.postId, boardId})
    justLayoutStore.openWinByNodeName({justId, nodeName: CONTENTS_VIEW})
  }
  return (
    <div className={classNames("post-list-row", {"active": postStore.post?.postId === row?.postId})} style={style} onClick={clickPost}>
      <div className="row-no">{no}</div>
      <div className="row-title">
        {boardName} -
        {title}
        {(attachCount + commentCount) > 0 && ' - '}
        {commentCount > 0 && <><Icon icon={faMessage} />{commentCount}</>}
        {imageCount > 0 && <><Icon icon={faImage} />{imageCount}</>}
        {videoCount > 0 && <><Icon icon={faFilm} />{videoCount}</>}
        {audioCount > 0 && <><Icon icon={faMusic} />{audioCount}</>}

      </div>
    </div>
  )
})

export default SearchRow
