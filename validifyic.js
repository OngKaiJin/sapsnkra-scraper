function validifyic(yy, mm, pb, last4D) {
    const day = [31,29,31,30,31,30,31,31,30,31,30,31];

    let save = (content,yy,mm,pb) => {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(new Blob([content], {type: "text/plain"}));
        a.download = yy + mm + "__" + pb + ".json";
        a.click(); 
    }

    let loop = (i) => {
        if (i <= mm[1]) {
            searchlist = [];
            contents = [];
            console.log("starting month: " + ("00" + i ).slice(-2));
            for (var j = 1; j <= day[i-1]; j++) {
                for (var k = 0; k <= last4D; k++) {
                    searchlist.push( yy + ("00" + i ).slice(-2) + ("00" + j ).slice(-2) + pb + ("0000" + k ).slice(-4) );
                }
            }
            Promise.all(searchlist.map(ic => 
                 fetch("https://sapsnkra.moe.gov.my/ajax/papar_carian.php?nokp=" + ic, {cache: "no-store"}).then((resp) => resp.text())
            ))
            .then((results) => {
                b = results.map(e => e.trim());
                searchlist.map((x, i) => {
                    if(b[i]=="Wujud") {
                        var obj = new Object();
                        obj.ic = x;
                        contents.push(obj);
                    }
                });
                save(JSON.stringify(contents),yy,("00" + i ).slice(-2),pb);
                loop(i + 1);
            });
        }
    }
    loop(mm[0]);
}
