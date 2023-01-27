import { IJSONObject } from '@automatisch/types';
import { AxiosRequestConfig } from 'axios';
import logger from '../../../../helpers/logger';
import defineAction from '../../../../helpers/define-action';

export default defineAction({
  name: 'Call an api',
  key: 'callApi',
  description: 'Call an api',
  arguments: [
    {
      label: 'Body',
      key: 'body',
      type: 'string' as const,
      required: true,
      description: 'Body of the email.',
      variables: true,
    },
  ],

  async run($) {
    let info = {} as IJSONObject;
    const url = $.auth.data.endpoint;
    const method = $.auth.data.method;
    const headers = $.auth.data.headers ?? null;
    const body = $.step.parameters.body ?? null;

    try {
      const config: AxiosRequestConfig = {};
      console.log('PARSE', headers as string);
      const parsedHeaders = headers ?? JSON.parse(headers as string);
      console.log('PARSE', body as string);
      const parsedBody = body ?? JSON.parse(body as string);
      config.headers = parsedHeaders;
      config.data = parsedBody;
      if (method === 'GET') {
        const result = await $.http.get(url as string, config);
        info = {
          data: result.data,
          status: result.status,
          headers: result.headers,
          statusText: result.statusText,
        };
      }
      if (method === 'POST') {
        const result = await $.http.post(url as string, { config });
        logger.info(JSON.stringify({ url, config }));
        info = {
          data: result.data,
          status: result.status,
          headers: result.headers,
          statusText: result.statusText,
        };
      }
    } catch (e) {
      info = { error: e.message ?? 'Something went wrong please check log for more info.' };
      logger.error(
        'EXECUTION ERROR REST FOR: ' +
          JSON.stringify({
            app: $.app,
            step: $.step,
            error: e,
            body,
            headers,
            method,
            url,
          })
      );
    }
    $.setActionItem({ raw: info as IJSONObject });
  },
});
