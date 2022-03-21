# CubeTrainer
 


## Comando utilizados:

* npm create next-app kubic
* cd kubic
* yarn add sass
* yarn add typescript @types/react @types/node -D
* yarn add next-auth
* yarn add @types/next-auth
* yarn add apexcharts react-apexcharts
* yarn add axios





## Scores:

Os scores quando logado são verificados apenas uma unica vez, quando há um novo score os dados são enviados ao servidor e aoo invez de pedir o servidor a nova lista com os scores atualizados, é também atualizado localmente, assim evitando chamadas ao fauna DB.
Ou seja, assim que é logado é feita a pesquisa dos scores no banco de dados, e não haverá outra pesquisa a menos que seja reiniciado a página, e a atualização dessa lista fica localmente.
Com um sistema de lista local é possível também utilizar o mesmo sistema para usuários não logados, sendo salvo o score apenas pelo tempo que durar a sessão.