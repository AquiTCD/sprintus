export default async ({ store, params }) => {
  const currentParams = {
    organization: '',
    team: '',
  }
  if (params.organization) {
    currentParams.organization = params.organization
  }
  if (params.team) {
    currentParams.team = params.team
  }
  await store.dispatch('setMeAsMember', currentParams.organization)
  await store.dispatch('updateCurrent', currentParams)
}
