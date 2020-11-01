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

func imageHandler(w http.ResponseWriter, r *http.Request) {
	filename := r.URL.Path
	fmt.Println(filename)
// 	http.ServeFile(w, r, "../public/static"+filename)
	http.ServeFile(w, r, "../../backend"+filename)
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

	if matchedJs {
		w.Header().Set("Content-Type", "text/javascript")
	} else if matchedCss {
		w.Header().Set("Content-Type", "text/css")
	}

	http.ServeFile(w, r, "../public"+path)
}

func main() {
	http.HandleFunc("/static/", resourceHandler)
// 	http.HandleFunc("/images/", resourceHandler)
	http.HandleFunc("/main.dist.css", resourceHandler)
	http.HandleFunc("/main.js", resourceHandler)
	http.HandleFunc("/images/", imageHandler)

	http.HandleFunc("/", mainHandler)

	fmt.Println("Start")
	log.Fatal(http.ListenAndServe("0.0.0.0:8000", nil))
}
