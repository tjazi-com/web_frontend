package com.tjazi.web.frontend.core.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Krzysztof Wasiak on 08/03/2016.
 */
@Controller
public class HomeController {

    @RequestMapping(value = {"/", "index", "index.html"}, method = RequestMethod.GET)
    public String index() {
        return "index";
    }
}
