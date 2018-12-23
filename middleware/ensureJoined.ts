export default async ({ store, params, redirect }) => {
  let meJoinedOrg = false
  const orgHasMe = true
  let meJoinedTeam = false
  let teamHasMe = false
  const myId = store.state.me.id
  const myOrganizationIds = store.state.me.organizationIds
  const myTeamIds = store.state.me.teamIds
  const organizationMembers = store.state.currentOrganization.members
  const teamMemberIds = store.state.currentTeam.memberIds

  meJoinedOrg = myOrganizationIds.some(id => {
    return id === params.organization
  })
  // orgHasMe = organizationMembers.some(member => {
  //   return member.id === store.state.me.id
  // })
  if (params.team) {
    meJoinedTeam = myTeamIds.some(id => {
      return id === params.team
    })
    teamHasMe = teamMemberIds.some(id => {
      return id === myId
    })
    if (!meJoinedTeam || !teamHasMe) {
      redirect(`/${params.organization}/${params.team}/join`)
    }
  }
  if (!meJoinedOrg || !orgHasMe) {
    redirect(`/${params.organization}/join`)
  }
}
