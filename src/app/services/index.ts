import { appConfig } from '../config/appConfig';
import type { Services } from './interfaces';

import { storageDemoAdapter } from './demo/storageDemo';
import { smsDemoAdapter } from './demo/smsDemo';
import { chatDemoAdapter } from './demo/chatDemo';
import { pushDemoAdapter } from './demo/pushDemo';
import { geoDemoAdapter } from './demo/geoDemo';
import { aiDemoAdapter, matchingDemoAdapter } from './demo/aiDemo';

import { storageAzureStub, storageGcsStub } from './integration/storageAzure.stub';
import { smsTwilioStub } from './integration/smsTwilio.stub';
import { chatAblyStub } from './integration/chatAbly.stub';
import { pushFcmStub } from './integration/pushFcm.stub';
import { geoGoogleStub } from './integration/geoGoogle.stub';
import { aiGeminiStub, matchingGeminiStub } from './integration/aiGemini.stub';

function buildServices(): Services {
  const isDemo = appConfig.mode === 'demo';

  const storage = isDemo
    ? storageDemoAdapter
    : appConfig.storageProvider === 'azure'
    ? storageAzureStub
    : appConfig.storageProvider === 'gcs'
    ? storageGcsStub
    : storageDemoAdapter;

  const sms = isDemo || appConfig.smsProvider === 'demo' ? smsDemoAdapter : smsTwilioStub;

  const chat = isDemo || appConfig.chatProvider === 'demo' ? chatDemoAdapter : chatAblyStub;

  const push = isDemo || appConfig.pushProvider === 'demo' ? pushDemoAdapter : pushFcmStub;

  const geo = isDemo || appConfig.mapProvider === 'osm' ? geoDemoAdapter : geoGoogleStub;

  const ai = isDemo || appConfig.aiProvider === 'demo' ? aiDemoAdapter : aiGeminiStub;

  const matching = isDemo || appConfig.aiProvider === 'demo' ? matchingDemoAdapter : matchingGeminiStub;

  return { storage, sms, chat, push, geo, ai, matching };
}

let _services: Services | null = null;

export function getServices(): Services {
  if (!_services) {
    _services = buildServices();
  }
  return _services;
}

export function useServices(): Services {
  return getServices();
}
