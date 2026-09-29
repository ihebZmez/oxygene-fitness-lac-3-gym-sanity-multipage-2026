import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '8igp3p0n',
    dataset: 'production',
  },
  // to delete if problem exists with deployment
  deployment: {
    appId: 's8kf4bz9fhwzytupid50v483',
  },
})
