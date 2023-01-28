import { IJSONObject, IJSONValue } from '@automatisch/types';
import { AxiosRequestConfig } from 'axios';
import logger from '../../../../helpers/logger';
import defineAction from '../../../../helpers/define-action';
import { URLSearchParams } from 'url';

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
      console.log('PARSE', body as string);
      if (headers) {
        config.headers = JSON.parse(headers as string);
      }
      if (method === 'GET') {
        if (body) {
          config.params = new URLSearchParams(JSON.parse(body as string));
        }
        logger.info(JSON.stringify({ url, config }));
        const result = await $.http.get(url as string, config);
        info = {
          data: result?.data,
          status: result?.status,
          headers: result?.headers,
          statusText: result?.statusText,
        };
      } else if (method === 'POST') {
        logger.info(JSON.stringify({ url, config }));
        const result = await $.http.post(
          url as string,
          JSON.parse(body as string),
          config
        );
        info = {
          data: result?.data,
          status: result?.status,
          headers: result?.headers,
          statusText: result?.statusText,
        };
      } else {
        throw new Error('Invalid request method.');
      }
      $.setActionItem({ raw: info as IJSONObject });
    } catch (e) {
      info = {
        error:
          e.message ?? 'Something went wrong please check log for more info.',
      };
      logger.error(e);
      logger.error(
        'EXECUTION ERROR REST FOR: ' +
          JSON.stringify({
            app: $.app,
            step: $.step,
            body,
            headers,
            method,
            url,
          })
      );
      $.setActionItem({ raw: info });
    }
  },
});
