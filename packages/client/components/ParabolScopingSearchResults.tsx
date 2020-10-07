import graphql from 'babel-plugin-relay/macro'
import React from 'react'
import {createPaginationContainer, RelayPaginationProp} from 'react-relay'
import {ParabolScopingSearchResults_viewer} from '../__generated__/ParabolScopingSearchResults_viewer.graphql'
import ParabolScopingSelectAllIssues from './ParabolScopingSelectAllIssues'
import ParabolScopingSearchResultItem from './ParabolScopingSearchResultItem'
import useLoadMoreOnScrollBottom from '~/hooks/useLoadMoreOnScrollBottom'
interface Props {
  relay: RelayPaginationProp
  viewer: ParabolScopingSearchResults_viewer
}

const ParabolScopingSearchResults = (props: Props) => {
  const {viewer, relay} = props
  const issueCount = viewer.tasks.pageInfo!.edgesReturned!
  const tasks = viewer.tasks.edges.map(({node}) => node)
  const lastItem = useLoadMoreOnScrollBottom(relay, {}, 50)
  return (
    <>
      <ParabolScopingSelectAllIssues selected={false} issueCount={issueCount} />
      {tasks.map((task) => {
        return <ParabolScopingSearchResultItem key={task.id} item={task} />
      })}
      {lastItem}
    </>
  )
}

export default createPaginationContainer(
  ParabolScopingSearchResults,
  {
    viewer: graphql`
      fragment ParabolScopingSearchResults_viewer on User {
        tasks(
          first: $first
          after: $after
          userIds: $userIds
          teamIds: $teamIds
          archived: false
          status: $status
          filterQuery: $filterQuery
        ) @connection(key: "ParabolScopingSearchResults_tasks") {
          edges {
            cursor
            node {
              ...ParabolScopingSearchResultItem_item
              __typename
              id
            }
          }
          pageInfo {
            hasNextPage
            endCursor
            edgesReturned
          }
        }
      }
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.tasks
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        first: totalCount
      }
    },
    getVariables(_, {count, cursor}, fragmentVariables) {
      return {
        ...fragmentVariables,
        first: count,
        after: cursor
      }
    },
    query: graphql`
      query ParabolScopingSearchResultsPaginationQuery(
        $first: Int!
        $after: DateTime
        $teamIds: [ID!]
        $userIds: [ID!]
        $status: TaskStatusEnum
        $filterQuery: String
      ) {
        viewer {
          ...ParabolScopingSearchResults_viewer
        }
      }
    `
  }
)