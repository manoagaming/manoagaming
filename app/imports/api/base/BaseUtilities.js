import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { LFG } from '/imports/api/LFG/LFGCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  LFG.removeAll();
}
