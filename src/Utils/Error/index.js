

const ErrorHandler = (Service) => 
{
  return async (req, res, next) => 
 {
    try 
    {
      await Service(req, res, next);
    } 
    catch (err) 
    {
      next(err); 
    }
  };
};

export default ErrorHandler;