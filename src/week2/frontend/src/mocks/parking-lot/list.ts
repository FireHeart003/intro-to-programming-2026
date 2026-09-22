import { http, HttpHandler, HttpResponse, delay } from 'msw';
import activeScenarios from '../active-scenarios';

const ENDPOINT = '/api/parking-lot';

const typicalResponse = [
  {
    id: '1',
    title: 'AWS Lambda',
    description: 'Heard about this in an email, what is the deal?',
    created: '2026-09-22T15:50:13.900Z',
  },
  {
    id: '2',
    title: 'The body without organs',
    description: 'Deleuze & Gatarri -still do not get it!',
    created: '2026-09-21T11:22:13.900Z',
  },
  {
    id: '3',
    title: 'Reactivity in Angular',
    description: 'Signals, computed values, and why they feel different from classic state.',
    created: '2026-09-20T09:15:00.000Z',
  },
];

const emptyResponse: never[] = [];

const largeResponse = Array.from({ length: 30 }, (_, index) => ({
  id: String(index + 1),
  title: `Topic ${index + 1}`,
  description: `Learning item ${index + 1} for the parking lot demo list.`,
  created: new Date(Date.now() - index * 86400000).toISOString(),
}));

const listHandler = http.get(ENDPOINT, async () => {
  const scenario = activeScenarios[`GET ${ENDPOINT}`] ?? 'large';

  switch (scenario) {
    case 'large':
      return HttpResponse.json(largeResponse);
    case 'typical':
      return HttpResponse.json(typicalResponse);
    case 'empty':
      return HttpResponse.json(emptyResponse);
    case 'slow':
      await delay(2000);
      return HttpResponse.json(typicalResponse);
    case 'unauthorized':
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    case 'server-error':
      return HttpResponse.json({ message: 'Failed to load parking lot items' }, { status: 500 });
    case 'timeout':
      await delay('infinite');
      return HttpResponse.json(typicalResponse);
    default:
      return HttpResponse.json(typicalResponse);
  }
});

const handlers: HttpHandler[] = [listHandler];

export default handlers;
