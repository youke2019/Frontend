import { EmitError } from '../src/utils/ErrorAlert'

test('send error to user ', () => {
  EmitError({
    error_msg: "sample error message"
  })
});
