Ajouter une opération bancaire : POST localhost:3000/accounting-lines/add

Récupérer toutes les opérations bancaires : GET localhost:3000/accounting-lines/find/all

Récupérer une opération bancaire: GET localhost:3000/accounting-lines/find?companyId={number}&accountingNumber={number}

Récupérer la liste des écritures comptables entre 2 dates données, pour un client précis: GET localhost:3000/accounting-lines/filter/?companyId=8&startDate=2020&endDate=2021

Calculer la somme des montants entre 2 dates données, pour un client précis : GET localhost:3000/accounting-lines/filter/?companyId=8&startDate=2020&endDate=2021

Modifier une opération bancaire : PATCH localhost:3000/accounting-lines/update?companyId={number}&accountingNumber={number}

Supprimer une opération bancaire : DELETE localhost:3000/accounting-lines/delete/?companyId={number}&accountingNumber={number}

Notes: Si plusieurs opérations bancaires ont le même "companyId" et "accountingNumber" alors les opérations d'ajout, de suppression et de modification impacteront toutes ces opérations. Dans l'ideal il aurait fallu générer dans la migration des "dummy data" ayant les champs "companyId" et "accountingNumber" uniques et l'api ne devrait pas permettre à l'utilisateur de pouvoir insérer une opération si une autre existe déjà dans la base de données avec ces mêmes champs.
