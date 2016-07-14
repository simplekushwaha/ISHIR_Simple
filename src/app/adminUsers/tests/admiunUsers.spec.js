describe('Component: AdminUsers', function() {
    var scope,
        q,
        adminUser,
        oc;
    beforeEach(module('orderCloud'));
    beforeEach(module('orderCloud.sdk'));
    beforeEach(inject(function($q, $rootScope, OrderCloud) {
        q = $q;
        scope = $rootScope.$new();
        adminUser = {
            "Username": "TestAdminUser",
            "ID": "TestAdminUser123456789",
            "Email": "testadmin@four51.com",
            "Password": "Fails345",
            "FirstName": "Test",
            "LastName": "Test"
        };
        oc = OrderCloud;
    }));

    describe('Controller: AdminUserCreateCtrl', function() {
        var adminUserCreateCtrl;
        beforeEach(inject(function($state, $controller) {
            adminUserCreateCtrl = $controller('AdminUserCreateCtrl', {
                $scope: scope
            });
            spyOn($state, 'go').and.returnValue(true);
        }));

        describe('Submit', function() {
            beforeEach(function() {
                adminUserCreateCtrl.adminUser = adminUser;
                var defer = q.defer();
                defer.resolve(adminUser);
                spyOn(oc.AdminUsers, 'Create').and.returnValue(defer.promise);
                adminUserCreateCtrl.Submit();
                scope.$digest();
            });
            it ('should call the AdminUsers Create method', function() {
                expect(oc.AdminUsers.Create).toHaveBeenCalledWith(adminUser);
            });
            it ('should enter the adminUsers state', inject(function($state) {
                expect($state.go).toHaveBeenCalledWith('adminUsers', {}, {reload:true});
            }));
        });
    });

    describe('Controller: AdminUserEditCtrl', function() {
        var adminUserEditCtrl;
        beforeEach(inject(function($state, $controller) {
            adminUserEditCtrl = $controller('AdminUserEditCtrl', {
                $scope: scope,
                SelectedAdminUser: adminUser
            });
            spyOn($state, 'go').and.returnValue(true);
        }));

        describe('Submit', function() {
            beforeEach(function() {
                adminUserEditCtrl.adminUser = adminUser;
                adminUserEditCtrl.adminUserID = "TestAdminUser123456789";
                var defer = q.defer();
                defer.resolve(adminUser);
                spyOn(oc.AdminUsers, 'Update').and.returnValue(defer.promise);
                adminUserEditCtrl.Submit();
                scope.$digest();
            });
            it ('should call the AdminUsers Update method', function() {
                expect(oc.AdminUsers.Update).toHaveBeenCalledWith(adminUserEditCtrl.adminUserID, adminUser);
            });
            it ('should enter the adminUsers state', inject(function($state) {
                expect($state.go).toHaveBeenCalledWith('adminUsers', {}, {reload:true});
            }));
        });

        describe('Delete', function() {
            beforeEach(function() {
                var defer = q.defer();
                defer.resolve(adminUser);
                spyOn(oc.AdminUsers, 'Delete').and.returnValue(defer.promise);
                adminUserEditCtrl.Delete();
                scope.$digest();
            });
            it ('should call the AdminUsers Delete method', function() {
                expect(oc.AdminUsers.Delete).toHaveBeenCalledWith(adminUser.ID);
            });
            it ('should enter the adminUsers state', inject(function($state) {
                expect($state.go).toHaveBeenCalledWith('adminUsers', {}, {reload:true});
            }));
        });
    });
});