﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Web.MVC.Exceptions
{
    public class AuthenticationFailedException:StatusException
    {
        public AuthenticationFailedException(string message):base(message,StatusCode.UNAUTHENTENICATION)
        {

        }
    }
}
