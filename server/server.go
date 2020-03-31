package main

import (
	"fmt"
	"log"
	"net/http"
	"regexp"
)

func mainHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "../public/index.html")
}

func resourceHandler(w http.ResponseWriter, r *http.Request) {
	var path = r.URL.Path

	matchedJs, errJs := regexp.MatchString(`.js$`, path)
	matchedCss, errCss := regexp.MatchString(`.css$`, path)

	if errJs != nil {
		panic(errJs)
	}

	if errCss != nil {
		panic(errCss)
	}

	fmt.Println(matchedJs, matchedCss, path)

	if matchedJs {
		w.Header().Set("Content-Type", "text/javascript")
	} else if matchedCss {
		w.Header().Set("Content-Type", "text/css")
	}

	http.ServeFile(w, r, "../public"+path)
}

func main() {
	http.HandleFunc("/controllers/", resourceHandler)
	http.HandleFunc("/handlebars/", resourceHandler)
	http.HandleFunc("/render/", resourceHandler)
	http.HandleFunc("/routing/", resourceHandler)
	http.HandleFunc("/services/", resourceHandler)
	http.HandleFunc("/static/", resourceHandler)
	http.HandleFunc("/main.css", resourceHandler)
	http.HandleFunc("/index.js", resourceHandler)
	http.HandleFunc("/mocks.js", resourceHandler)

	http.HandleFunc("/", mainHandler)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
