import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import SubjectList from '../components/SubjectList.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections, FlowRouter } = context();
  const service = FlowRouter.getParam('menu');
  if (Meteor.subscribe('services.subjectsList', service).ready()) {
    const subjects = Collections.Subjects.find().fetch();
    onData(null, { subjects });
  } else {
    onData(null, {});
  }
};

export const depsMapper = (context, action) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SubjectList);
