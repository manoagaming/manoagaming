import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { LFG } from '/imports/api/LFG/LFGCollection';

Interests.publish();
Profiles.publish();
LFG.publish();
