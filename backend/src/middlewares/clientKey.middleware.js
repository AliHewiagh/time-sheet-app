const response = require('../helpers/response.helper');
const { ERRORS } = require('./../errorDefinition/errorCodesConstants');
const { CLIENT_KEY_NO_LONGER_SUPPORTED_PLS_USE_IOWT } = require('./../errorDefinition/errors.map');
const { ErrorParser } = require('./../errorParser/errorParser');
const PHINONIC_KEY = 'Ph!no!icApp';
const CHINA_DASHBOARD_KEY = 'DA$H!BO^AR%D_V2';
const KITAR3CYCLE = 'K!taR3cycle';
const SWC = 'SwC0rP@pp';
const CHNAPP = 'CH!NA_@PP';
const CHNAPPMINI = 'CH!NA_M!Ni_@PP';
const EXPERTAPPCYBERVIEW = 'E!XP$RT@AP%/C^B$RV!W';
const EXPERTAPPSWM = 'E!XP$RT@AP%/S^W$M';
const TREEHUGGER = 'TR334u993r!_@pp';
const SMARTBIN = 'S^M@Rt_B!N';
const CHINATOWNCL = 'T03n_40Nc!1';
class ClientKeyMiddleware {
  static async clientKey(req, res, next) {
    try {
      let lang = req.header('languageid');
      if (lang) {
        switch (lang) {
          case '1':
            global.currentLang = 'en-US';
            break;
          case '2':
            global.currentLang = 'ms';
            break;
          case '3':
            global.currentLang = 'zh-Hans';
            break;
          case '4':
            global.currentLang = 'zh-Hant';
            break;
          default:
            global.currentLang = 'en-US';
            break;
        }
      } else {
        global.currentLang = 'en-US';
      }
      const givenClientKey = req.header('Client-key');
      if (givenClientKey === PHINONIC_KEY) {
        req.client = {
          key: "com.icycleglobal.phinonic"
        };
        next();
      } else if (givenClientKey === KITAR3CYCLE) {
        req.client = {
          key: "com.icycleglobal.kitar3cycle"
        };
        throw CLIENT_KEY_NO_LONGER_SUPPORTED_PLS_USE_IOWT;
        next();
      } else if (givenClientKey === SWC) {
        req.client = {
          key: "com.icycleglobal.swcorp"
        };
        next();
      } else if (givenClientKey === CHNAPP) {
        req.client = {
          key: "com.icycleglobal.phinonic.china.app"
        };
        next();
      } else if (givenClientKey === CHNAPPMINI) {
        req.client = {
          key: "com.icycleglobal.phinonic.china.mini.app"
        };
        next();
      } else if (givenClientKey === EXPERTAPPCYBERVIEW) {
        req.client = {
          key: "com.icycleglobal.expert.cyberview.app"
        };
        next();
      } else if (givenClientKey === EXPERTAPPSWM) {
        req.client = {
          key: "com.icycleglobal.expert.swm.app"
        };
        next();
      } else if (givenClientKey === TREEHUGGER) {
        req.client = {
          key: "com.icycleglobal.phinonic.treehugger.app"
        };
        next();
      } else if (givenClientKey === SMARTBIN) {
        req.client = {
          key: "com.icycleglobal.phinonic.smartbin.app"
        };
        next();
      } else if (givenClientKey === CHINATOWNCL) {
        req.client = {
          key: "com.icycleglobal.phinonic.towncouncildata.app"
        };
        next();
      } else if (givenClientKey === CHINA_DASHBOARD_KEY) {
        req.client = {
          key: "com.icycleglobal.phinonic.chinadashboard.app"
        };
        next();
      } else {
        res
          .status(200)
          .send(new ErrorParser(ERRORS.NOT_AUTHORIZED));
      }

    } catch (error) {
      console.log(error);
      res.sendError(error, req.header('languageId'), null, error);
    }
  }
}

module.exports = ClientKeyMiddleware;
