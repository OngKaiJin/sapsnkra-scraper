function scraper(list) {
    ic = [];
    contents = [];
    parser = new DOMParser();
    ajaxRequest = new XMLHttpRequest();
    for (let x in list) {
        ic.push(list[x].ic);
    } 
    total = ic.length;
    let loop = (i) => {
        if (i < total) {
            ajaxRequest.open("GET", "https://sapsnkra.moe.gov.my/ajax/papar_carian.php?nokp=" + ic[i], false);
            ajaxRequest.send(null);
            fetch("https://sapsnkra.moe.gov.my/ibubapa2/semak.php", {cache: "no-store"}).then((resp) => resp.text())
            .then((content) => {
                geticnumber = parser.parseFromString(content, "text/html").getElementById("div_cariansekolah").querySelector("table").querySelector("tbody").querySelectorAll("tr")[1].querySelectorAll("td")[2].innerHTML;
                if(geticnumber == ic[i]) {
                    var obj = new Object();
                    var yearobj = new Object();
                    obj.ic = geticnumber;
                    getname = parser.parseFromString(content, "text/html").getElementById("div_cariansekolah").querySelector("table").querySelector("tbody").querySelectorAll("tr")[2].querySelectorAll("td")[2].innerHTML;
                    obj.name = getname;
                    let loop2 = (i) => {
                        fetch("https://sapsnkra.moe.gov.my/ajax/maklumat_pelajar.php?tahun=2022", {cache: "no-store"}).then((resp) => resp.text())
                        .then((content) => {
                            s = content.trim();
                            var arr = s.split("|");
                            if(s == "Tidak Wujud"){
                                obj.y2022 = "--";
                            } else if (arr[0] == "Wujud") {
                                papar = arr[4].match(/'(.*?)'/g).map(e => e.split("'").join(""));
                                if (papar[2] == ic[i]) {
                                    yearobj.code = papar[3];
                                    yearobj.grade = papar[4];
                                    yearobj.class = papar[5];
                                    obj.y2022 = yearobj;
                                } else {
                                    loop2(i);
                                }
                            }
                        });
                    }
                    loop2(i);
                    console.log(obj, (i+1),total);
                    contents.push(obj);
                    loop(i+1);
                } else {
                    loop(i);
                }
            });
        } else if (i = total) {
            setTimeout(() => {
                var a = document.createElement("a");
                a.href = window.URL.createObjectURL(new Blob([JSON.stringify(contents)], {type: "text/plain"}));
                a.download = "output.json";
                a.click(); 
            }, 1000)
        }
    }
    loop(0);
}
