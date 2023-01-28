import _ from "lodash";
import { AxiosError } from "axios";
type ParsedError = { status?: any; errors: any[] };
const parseError = (error: AxiosError) => {
  return new Promise<ParsedError>(async (resolve, reject) => {
    const result: ParsedError = {
      status: 0,
      errors: [],
    };

    try {
      if (error.response === undefined) {
        result.errors.push(error.message);
      } else {
        result.status = error.response.status;

        const msg = _.get(error, "response.data.message");

        const errors: any = _.get(error, "response.data.errors");
        if (errors) {
          if (_.isString(errors)) {
            result.errors.push(errors);
          } else if (_.isArray(errors)) {
            result.errors.push(
              errors.map((e: any) => {
                /// TODO:
                if (_.isString(e)) {
                  return e;
                } else if (_.isObjectLike(e)) {
                  return Object.keys(e).map((k, i) => {
                    return e[k];
                  });
                } else {
                  return e;
                }
              })
            );
          } else if (_.isObject(errors)) {
            const value = _.values(errors)[0];
            if (value) {
              result.errors.push(_.isArray(value) ? value[0] : value);
            }
          } else {
            const msg = _.get(error, "response.data.message");
            result.errors.push(msg || error.message);
          }
        } else {
          const msg = _.get(error, "response.data.message");
          result.errors.push(msg || error.message);
        }
      }
      console.log(result);
      resolve(result);
    } catch (e) {
      console.log(e);
      result.errors.push("Unhandled exception");
      resolve(result);
    }
  });
};

export default { parseError };
