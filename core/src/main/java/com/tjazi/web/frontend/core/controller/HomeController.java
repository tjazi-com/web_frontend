package com.tjazi.web.frontend.core.controller;

import com.tjazi.chatrooms.client.ChatroomsClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.UUID;

/**
 * Created by Krzysztof Wasiak on 08/03/2016.
 */
@Controller
public class HomeController {

    @Autowired
    private ChatroomsClient chatroomsClient;

    @RequestMapping(value = {"/", "index", "index.html"}, method = RequestMethod.GET)
    public String index() {

        chatroomsClient.deleteChatroom(UUID.randomUUID());
        return "index";
    }
}
