import { createStore } from 'vuex'

export default createStore({
  state: {
    pipelineInfo: {
      pipeline_alias: '',
      start_time: '',
      end_time: '',
      run_number_list: []
    }
  },
  getters: {
  },
  mutations: {
    set_pipeline_alias(state, newPipelineAlias) {
      state.pipelineInfo.pipeline_alias = newPipelineAlias
    },
    set_times(state, newTimes) {
      state.pipelineInfo.start_time = newTimes[0].valueOf()
      state.pipelineInfo.end_time = newTimes[1].valueOf()
    },
    set_run_number_list(state, newRunNumberList) {
      state.pipelineInfo.run_number_list = newRunNumberList
    }
  },
  actions: {
  },
  modules: {
  }
})
