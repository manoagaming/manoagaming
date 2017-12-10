import { FlowRouter } from 'meteor/kadira:flow-router';


Template.LFG_Page_Directory.helpers({
  routeUserName() {
    return FlowRouter.getParam('username');
  }
});