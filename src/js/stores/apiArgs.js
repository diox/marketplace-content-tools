import {Store} from 'flummox';
import Url from 'urlgray';


export default class ApiArgs extends Store {
  constructor(flux) {
    super();

    const loginActionIds = flux.getActionIds('login');
    this.register(loginActionIds.login, this.handleUser);
    this.register(loginActionIds.loggedIn, this.handleUser);

    var qs = {};
    this.state = {
      lang: qs.lang ||
            (navigator.l10n && navigator.l10n.language) ||
            navigator.language ||
            navigator.userLanguage,
      region: qs.region || 'restofworld'
    };

    if (qs.carrier) {
        this.state.carrier = qs.carrier;
    }
  }
  handleUser(user) {
    // User data available. Set args based on user information.
    var newState = {};

    // Shared secret auth token.
    if (user.token) {
      newState._user = user.token;
    }

    // Region.
    var set = user.settings;
    var region = set.region_override || set.region_sim || set.region_geoip;
    if (region) {
      newState.region = region;
    }

    // Carrier.
    var carrier = set.carrier_override || set.carrier_sim;
    if (carrier) {
      newState.carrier = carrier;
    }

    this.setState(newState);
  }
}